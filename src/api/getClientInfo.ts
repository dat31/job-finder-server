import axios, { AxiosResponse } from "axios";
import { GeoPluginResponse } from "../types";

const GEO_PLUGIN_URL = "http://www.geoplugin.net/json.gp"

export function getClientInfo(): Promise<AxiosResponse<GeoPluginResponse>> {
    return axios.get( GEO_PLUGIN_URL )
}
