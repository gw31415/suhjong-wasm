from urllib.parse import quote as urlparse
text = 'Input 5 numbers. The Highest Score is : Available Equations +-×/()=1234567890'
chars = sorted(list(set(text)))
string = ''.join(chars)
print(urlparse(string))
