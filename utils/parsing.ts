export const parseData = function<R = any> (stringBody: string, keys: (keyof R)[]) {
  return stringBody.split('@@').reduce((prev, current) => {
    const curSplit = current.split('##')
    const re = {} as R
    for (const [i, cur] of curSplit.entries()) {
      const key = keys[i]
      if (key === 'lat' || key === 'lng')
        re[key] = parseFloat(cur) as R[keyof R]
      else
        re[key] = cur as R[keyof R]
    }
    prev.push(re)
    return prev
  }, [] as R[])
}
