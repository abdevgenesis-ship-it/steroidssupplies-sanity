import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gxu7e27l',
    dataset: 'production'
  },
  studioHost: 'steroidssupplies',
  deployment: {
    appId: 'cltbqadknswifytfrxocjzhf',
    autoUpdates: true,
  }
})
