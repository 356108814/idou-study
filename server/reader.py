# encoding: utf-8
"""

@author Yuriseus
@create 2017-12-21 18:10
"""
from aip import AipSpeech

if __name__ == '__main__':
    APP_ID = '10566995'
    API_KEY = 'H1fzC7Yxeilyvdp1kDyxByXD'
    SECRET_KEY = '2a3de89e34841a20ad68bb01b8dc683d'
    aipSpeech = AipSpeech(APP_ID, API_KEY, SECRET_KEY)
    
    s = u'中文截取'
    for word in s:
        result = aipSpeech.synthesis(word, 'zh', 1, {
            'vol': 1,
            'spd': 0,
            'per': 0
        })
        # 识别正确返回语音二进制 错误则返回dict 参照下面错误码
        if not isinstance(result, dict):
            with open('J:/word/%s.mp3' % word, 'wb') as f:
                f.write(result)

    print('success')
