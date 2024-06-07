import { ApiService } from "./api.service";
const MainService = {
    GetApps() {
        return ApiService.get("apps")
    },
    
}

export default MainService;