import sharp from 'sharp'

export const optimizationImage = (file: Express.MulterFile) => {
  return sharp(file.buffer)
    .resize({
      width: 600,
      height: 600,
      fit: 'contain',
      position: 'center',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .webp({ quality: 90 })
    .toBuffer()
}
