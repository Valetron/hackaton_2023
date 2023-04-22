export interface ICamera {
  id: number | null
  name: string
  areas: Array<ICameraAreas>
  link: string
  processDelay: number | null
  openedCanvas: boolean
}

export interface ICameraAreas {
  name: string
  points: Array<IAreaPoints>
}

export interface IAreaPoints {
  x: number
  y: number
}
