import zlib
import struct

def get_png_bbox(filename):
    with open(filename, 'rb') as f:
        signature = f.read(8)
        if signature != b'\x89PNG\r\n\x1a\n':
            print("Not a valid PNG")
            return
            
        chunks = []
        while True:
            try:
                length = struct.unpack('>I', f.read(4))[0]
                chunk_type = f.read(4)
                data = f.read(length)
                crc = f.read(4)
                chunks.append((chunk_type, data))
                if chunk_type == b'IEND':
                    break
            except Exception as e:
                break
                
        width, height = 0, 0
        for ct, data in chunks:
            if ct == b'IHDR':
                width, height, bit_depth, color_type, comp_meth, filter_meth, interlace = struct.unpack('>IIBBBBB', data)
                print(f"Size: {width}x{height}, Color Type: {color_type}, Interlace: {interlace}")
                break

get_png_bbox('public/images/logo.png')
