import qrcode
from PIL import Image

URL = "https://banhmyxoingoc.nguyenvanhan.io.vn/menu"

# 1) Tạo QR với mức sửa lỗi cao để chèn logo vẫn quét tốt
qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # H = 30% phục hồi
    box_size=20,   # tăng nếu muốn ảnh lớn hơn để in
    border=4
)
qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")

# 2) Mở logo
logo = Image.open("logo.png").convert("RGBA")

# 3) Resize logo: ~18–22% chiều rộng QR là đẹp và dễ quét
qr_w, qr_h = img.size
logo_max_w = int(qr_w * 0.20)
logo_max_h = int(qr_h * 0.20)
logo.thumbnail((logo_max_w, logo_max_h), Image.LANCZOS)

# 4) Tạo nền trắng bo nhẹ phía sau logo để tăng tương phản (giúp quét ổn định)
pad = int(qr_w * 0.02)  # padding quanh logo
bg_w, bg_h = logo.size[0] + pad * 2, logo.size[1] + pad * 2
bg = Image.new("RGBA", (bg_w, bg_h), (255, 255, 255, 255))

# 5) Paste nền + logo vào giữa QR
pos_bg = ((qr_w - bg_w) // 2, (qr_h - bg_h) // 2)
pos_logo = ((bg_w - logo.size[0]) // 2, (bg_h - logo.size[1]) // 2)

img.paste(bg, pos_bg, bg)
bg.paste(logo, pos_logo, logo)

# 6) Dán lại vào QR
img.paste(bg, pos_bg, bg)

# 7) Lưu file
img.save("qr-menu.png")      # dùng online/điện thoại
img.convert("RGB").save("qr-menu.jpg", quality=95)  # nếu cần jpg
print("Done: qr-menu.png")
