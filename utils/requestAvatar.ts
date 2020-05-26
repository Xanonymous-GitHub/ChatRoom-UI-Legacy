export default async function getBase64ImgPath (url: string): Promise<string> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image()
  await new Promise((resolve) => {
    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      console.log(image.src)
      ctx!.drawImage(image, 0, 0)
      ctx!.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve()
    }
    image.src = url
    image.crossOrigin = 'anonymous'
  })
  return canvas.toDataURL()
}
