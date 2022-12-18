<script lang="ts" setup>
import { VApp, VMain } from 'vuetify/components'
import * as L from 'leaflet'
import 'leaflet-markers-canvas'
import type { ValueGeo } from './stores/geo'

const geo = useGeo()
const zoomCheck = [14, 11, 9, 7, 5]
const typeCheck = ['pelanggan', 'kelurahan', 'kecamatan', 'kabupaten', 'provinsi']

const map = ref<L.Map | null>(null)
const isloaded = ref(false)
const markers = ref([])
const type = ref('provinsi')
const zoom = ref(5)
const isZoomOut = ref(false)

const pelanggan = computed(() => geo.getGeoPelanggan)
const kecamatan = computed(() => geo.getGeoKecamatan)
const kabupaten = computed(() => geo.getGeoKabupaten)
const provinsi = computed(() => geo.getGeoPronvisi)
const kelurahan = computed(() => geo.getGeoKelurahan)
const colorChange = computed(() => {
  if (type.value === 'provinsi')
    return '#d32f2f'
  if (type.value === 'kabupaten')
    return '#512da8'
  if (type.value === 'kecamatan')
    return '#00796b'
  if (type.value === 'kelurahan')
    return '#1976d2'
  return ''
})

const layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
})
const markersCanvas = new L.MarkersCanvas()

const clickGeo = async function (ll: ValueGeo['lokasi'][0]) {
  try {
    await geo.getGeo({
      idWilayah: ll.id,
    })
    const findIndex = typeCheck.findIndex(v => v === type.value)
    const ty = typeCheck[findIndex - 1]
    type.value = ty
    let markers: L.Marker[] = []
    if (type.value === 'kabupaten') {
      markers = kabupaten.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || []
    }
    if (type.value === 'kecamatan') {
      markers = kecamatan.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || []
    }
    if (type.value === 'kelurahan') {
      markers = kelurahan.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || []
    }
    if (type.value === 'pelanggan') {
      markers = pelanggan.value?.lokasi.map((lok) => {
        const svg = pelangganBase
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
          true,
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || []
    }
    const group = L.featureGroup(markers)
    map.value?.fitBounds(group.getBounds())
    markersCanvas.clear()
    markersCanvas.addMarkers(markers)
    // map.value?.fitBounds(markersCanvas.getBounds())
    // markersCanvas.redraw()
  }
  catch (err) {}
}

const iddle = useDebounce(() => {
  if (!isZoomOut.value)
    return
  if (zoom.value >= zoomCheck[0]) {
    if (pelanggan.value) {
      type.value = 'pelanggan'
      markersCanvas.clear()
      markersCanvas.addMarkers(pelanggan.value?.lokasi.map((lok) => {
        const svg = pelangganBase
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
          true,
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || [])
    }
  }
  else if (zoom.value >= zoomCheck[1]) {
    if (kelurahan.value) {
      type.value = 'kelurahan'
      markersCanvas.clear()
      markersCanvas.addMarkers(kelurahan.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || [])
    }
  }
  else if (zoom.value >= zoomCheck[2]) {
    if (kecamatan.value) {
      type.value = 'kecamatan'
      markersCanvas.clear()
      markersCanvas.addMarkers(kecamatan.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || [])
    }
  }
  else if (zoom.value >= zoomCheck[3]) {
    if (kabupaten.value) {
      type.value = 'kabupaten'
      markersCanvas.clear()
      markersCanvas.addMarkers(kabupaten.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || [])
    }
  }
  else if (zoom.value >= zoomCheck[4]) {
    if (provinsi.value) {
      type.value = 'provinsi'
      markersCanvas.clear()
      markersCanvas.addMarkers(provinsi.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || [])
    }
  }
  console.log(isZoomOut.value, zoom.value, zoomCheck)
  if (type.value === 'provinsi')
    geo.removeGeo(['kabupaten', 'kecamatan', 'kelurahan', 'pelanggan'])
  if (type.value === 'kabupaten')
    geo.removeGeo(['kecamatan', 'kelurahan', 'pelanggan'])
  if (type.value === 'kecamatan')
    geo.removeGeo(['kelurahan', 'pelanggan'])
  if (type.value === 'kelurahan')
    geo.removeGeo(['pelanggan'])
}, 1)

watch(zoom, (cur, prev) => {
  if (cur === null || prev === null)
    return
  isZoomOut.value = cur < prev
  iddle()
})

watch(isloaded, async (val) => {
  if (val) {
    try {
      await geo.getGeo({
        idWilayah: '',
      })
      const provinsiRes = provinsi.value?.lokasi.map((lok) => {
        const svg = window.btoa(`
  <svg fill="${colorChange.value}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="'Helvetica Neue', Arial, Helvetica, sans-serif">${lok.jumlah}</text>   
  </svg>`)
        const icon = L.icon({
          iconUrl: `data:image/svg+xml;base64,${svg}`,
          iconSize: [50, 50],
          iconAnchor: [25, 0],
        })
        const marker = L.marker(
          [lok.lat, lok.lng],
          { icon },
        )
        const cc = getCircleWithTextSvg(
          lok.nama,
          async () => {
            await clickGeo(lok)
            marker.closePopup()
          },
        )
        marker.bindPopup(
          cc,
        ).on({
          click() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
            this?.openPopup()
          },
        })
        return marker
      }) || []
      const group = L.featureGroup(provinsiRes)
      map.value?.fitBounds(group.getBounds())
      markersCanvas.clear()
      markersCanvas.addMarkers(provinsiRes)
      // map.value?.fitBounds(markersCanvas.getBounds())
      // markersCanvas.redraw()
    }
    catch (err) {}
  }
})

onMounted(() => {
  map.value = L.map('map', {
    layers: [layer],
    zoomAnimation: false,
  })
  markersCanvas.addTo(map.value as L.Map)
  map.value.on('load', () => {
    isloaded.value = true
  })
  map.value.setView([-0.9277539, 118.4065739], 5)
  map.value.on('zoom', () => {
    zoom.value = map.value?.getZoom() ?? 5
  })
})
</script>

<template>
  <VApp>
    <VMain>
      <div
        id="map" :class="useCss({
          width: '100%',
          height: '100vh',
        })"
      />
    </VMain>
  </VApp>
</template>
