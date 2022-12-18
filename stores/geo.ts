export interface ValueGeo {
  warna: string
  lokasi: {
    id: string
    lat: number
    lng: number
    nama: string
    jumlah: string | number
  }[]
}

export const useGeo = defineStore('geo', {
  state: () => ({
    isHit: false,
    geoProvinsi: null as ValueGeo | null,
    geoKabupaten: null as ValueGeo | null,
    geoKecamatan: null as ValueGeo | null,
    geoKelurahan: null as ValueGeo | null,
    geoPelanggan: null as ValueGeo | null,
  }),
  getters: {
    getGeoPronvisi: state => state.geoProvinsi,
    getGeoKabupaten: state => state.geoKabupaten,
    getGeoKecamatan: state => state.geoKecamatan,
    getGeoKelurahan: state => state.geoKelurahan,
    getGeoPelanggan: state => state.geoPelanggan,
  },
  actions: {
    removeGeo(datas: string[]) {
      datas.forEach((dt) => {
        this[`geo${useCapitalize(dt)}` as 'geoProvinsi' | 'geoKabupaten' | 'geoKecamatan' | 'geoKelurahan' | 'geoPelanggan'] = null
      })
    },
    async getGeo(data: { idWilayah: string }) {
      if (this.isHit)
        return
      this.isHit = true
      try {
        const res = await getGeo(data)
        if (res.layer === '5')
          this.geoProvinsi = res
        if (res.layer === '4')
          this.geoKabupaten = res
        if (res.layer === '3')
          this.geoKecamatan = res
        if (res.layer === '2')
          this.geoKelurahan = res
        if (res.layer === '1')
          this.geoPelanggan = res
        this.isHit = false
        return {}
      }
      catch (err) {
        this.isHit = false
        return Promise.reject(err)
      }
    },
  },
})
