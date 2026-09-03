#!/usr/bin/env python3
"""Re-record the Parents page audio with Gemini TTS. Run from website2/: python3 tools/record_parents_audio.py
Needs GEMINI_API_KEY in the environment and ffmpeg. Skips files that already exist unless --force."""
import os,re,json,base64,urllib.request,subprocess,sys,html,time
KEY=os.environ['GEMINI_API_KEY'];VOICE='Kore';FORCE='--force' in sys.argv
src=open('parents.html',encoding='utf-8').read()
def clean(t):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',t))).strip()
def attrs(tag_html):return {k:clean(v) for k,v in re.findall(r'data-(th|en)="([^"]*)"',tag_html)}
def tag(name,block):return re.search(r'<'+name+r'\s[^<]*?data-th="[^"]*"[^<]*?data-en="[^"]*"',block).group(0)
items=[]
hero=re.search(r'<header class="page-hero parents-hero">(.*?)</header>',src,re.S).group(1)
h1=attrs(tag('h1',hero));p=attrs(tag('p',hero))
items.append(('hero',{l:h1[l]+'. '+p[l] for l in ('th','en')}))
cards=re.findall(r'<div class="road-card rv">(.*?)</div>\s*(?=<div class="road-card|</div>)',src,re.S)
tips={'th':[],'en':[]}
for c in cards:
    b=attrs(tag('b',c));q=attrs(tag('p',c))
    for l in tips:tips[l].append(b[l]+'. '+q[l])
items.append(('tips',{l:' ... '.join(tips[l]) for l in tips}))
for i,n in enumerate(re.findall(r'<article class="note rv">(.*?)</article>',src,re.S),1):
    h=attrs(tag('h3',n));q=attrs(tag('p',n))
    items.append((f'note-{i}',{l:h[l]+'. '+q[l] for l in ('th','en')}))
STYLE={'en':'Read this warmly and unhurried, like a kind, experienced teacher speaking to parents: ','th':'อ่านอย่างอบอุ่น ไม่รีบ เหมือนครูใจดีที่มีประสบการณ์คุยกับผู้ปกครอง: '}
def tts(text,out):
    body={"contents":[{"parts":[{"text":text}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":VOICE}}}}}
    for attempt in range(3):
        try:
            req=urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={KEY}",data=json.dumps(body).encode(),headers={"Content-Type":"application/json"})
            r=json.load(urllib.request.urlopen(req,timeout=180));d=r["candidates"][0]["content"]["parts"][0]["inlineData"];break
        except Exception as e:
            print('  retry',attempt,e);time.sleep(4)
    else: raise SystemExit('failed '+out)
    pcm=out+'.pcm';open(pcm,'wb').write(base64.b64decode(d["data"]))
    subprocess.run(["ffmpeg","-v","error","-y","-f","s16le","-ar","24000","-ac","1","-i",pcm,"-b:a","56k",out],check=True);os.remove(pcm)
for key,texts in items:
    for l,t in texts.items():
        out=f'assets/audio/parents-{key}-{l}.mp3'
        if os.path.exists(out) and not FORCE: print('skip',out);continue
        print('record',out,len(t),'chars');tts(STYLE[l]+t,out)
print('done')
