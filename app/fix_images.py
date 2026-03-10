import os
from PIL import Image

def remove_white_bg(image_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    # threshold - насколько близким к белому должен быть цвет, чтобы стать прозрачным
    threshold = 240 
    
    for item in datas:
        # Проверяем, является ли пиксель почти белым (RGB > threshold)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0)) # Делаем прозрачным
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"Processed: {image_path}")

img_dir = "public/assets/images"
if os.path.exists(img_dir):
    for filename in os.listdir(img_dir):
        if filename.endswith(".png"):
            remove_white_bg(os.path.join(img_dir, filename))
else:
    print(f"Directory {img_dir} not found!")

