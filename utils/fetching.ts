export const getGeo = async function (data: {
  idWilayah: string
}) {
  const config = useRuntimeConfig()
  const { public: { token } } = config
  const res = await $fetch<{
    data: {
      Data1: string
      Data2: string
      Data3: string
    }
    success: boolean
    message: string
  }>('https://rcrmdev.iconpln.co.id/icrm-be-backoffice-dev/geo/latlon/lihat/V1', {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.success) {
    return Promise.reject(createError({
      message: res.message,
      statusMessage: res.message,
    }))
  }
  if (res.data.Data1 !== '') {
    return Promise.reject(createError({
      message: res.data.Data1,
      statusMessage: res.data.Data1,
    }))
  }
  const [layer, warna] = res.data.Data2.split('@@')
  const parse = parseData<{
    id: string
    lat: number
    lng: number
    nama: string
    jumlah: string
    gaktau: string
  }>(res.data.Data3, [
    'id',
    'lat',
    'lng',
    'nama',
    'jumlah',
    'gaktau',
  ])

  return {
    layer,
    warna,
    lokasi: parse,
  }
}
