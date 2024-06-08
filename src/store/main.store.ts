import { defineStore } from 'pinia'
import { IApp } from '@/models/type'
import MainService from '@/service/main.service'
import { AxiosResponse } from 'axios'
interface IMainStore {
    apps: IApp[]
}
export const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
      apps: []
  }),
  getters: {
    getApps(): IApp[] {
        return this.apps
    }
  },
  actions: {
    GetApps() {
        this.apps = []
        MainService.getApps().then((res: any) => {
            this.apps = res.data    
        })
    },
    async CreateApp(name: string) {
        await MainService.createApp({name}).then((res: AxiosResponse) => {
            console.log(res);            
        })
    },
    async EditApp(data: {id: number, name: string}) {
        await MainService.updateAppName(data.id, {name: data.name}).then((res: AxiosResponse) => {
            console.log(res);            
        })
    }
  }
})