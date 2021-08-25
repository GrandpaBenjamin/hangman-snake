#from PIL import Image, ImageDraw, ImageFont
import shutil

original = f'P:\\gam\\snak\\public\\snak\\assets\\letters\\base_apple.png'

alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

for x in range(len(alphabet)):

    # copy
    if x != 0:
        target = f'P:\\gam\\snak\\public\\snak\\assets\\letters\\{alphabet[x]}.png'
        shutil.copyfile(original, target)
        print(f"just copied file {x}.png")

'''
    # create images
    img = Image.new('RGB', (100, 30), color=(255, 255, 255))

    fnt = ImageFont.truetype('/Library/Fonts/Consolas.ttf', 15)
    d = ImageDraw.Draw(img)
    d.text((10, 10), f"{x}", font=fnt, fill=(0, 0, 0))

    img.save(f'{x}.png')
'''
