export const getCircleWithTextSvg = function (text: string, btnClick: () => any, isPelanggan = false) {
  const el = document.createElement('div')
  const title = document.createElement('div')
  title.classList.add('pb-2')
  title.innerText = text
  if (!isPelanggan) {
    const link = document.createElement('a')
    link.innerText = 'Click Here'
    link.href = '#'
    link.onclick = (e) => {
      e.preventDefault()
      btnClick()
    }
    el.append(title, link)
    return el
  }
  el.append(title)
  return el
}
