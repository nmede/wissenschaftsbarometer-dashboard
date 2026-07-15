#!/usr/bin/env python3
"""Assemble the self-contained Wissenschaftsbarometer dashboard v3 (index.html).
Run build3_data.py first if the survey data changed."""
import os, base64, subprocess, sys

HERE=os.path.dirname(os.path.abspath(__file__))
LOGO=os.environ.get("WB_LOGO","/mnt/user-data/uploads/Wissenschaftsbarometer_CH_Logo.jpg")

def assemble():
    tpl  =open(os.path.join(HERE,'template3.html')).read()
    data =open(os.path.join(HERE,'data3.json')).read()
    tr   =open(os.path.join(HERE,'translations.js')).read()
    tr3  =open(os.path.join(HERE,'translations3.js')).read()
    b64  =base64.b64encode(open(LOGO,'rb').read()).decode()
    mime ='image/jpeg' if LOGO.lower().endswith(('.jpg','.jpeg')) else 'image/png'
    html =(tpl.replace('__WB_DATA__',data)
              .replace('/* __WB_TRANSLATIONS__ */',tr)
              .replace('/* __WB_TRANSLATIONS3__ */',tr3)
              .replace('__WB_LOGO__','data:'+mime+';base64,'+b64))
    for ph in ['__WB_DATA__','__WB_TRANSLATIONS__','__WB_TRANSLATIONS3__','__WB_LOGO__']:
        assert ph not in html, f"placeholder {ph} not replaced"
    open(os.path.join(HERE,'index.html'),'w').write(html)
    print(f"index.html: {round(len(html)/1024)} kB (self-contained)")

if __name__=='__main__':
    if not os.path.exists(os.path.join(HERE,'data3.json')) or '--data' in sys.argv:
        subprocess.check_call([sys.executable,os.path.join(HERE,'build3_data.py')])
    assemble()
    print("Done. Open index.html in a browser.")
