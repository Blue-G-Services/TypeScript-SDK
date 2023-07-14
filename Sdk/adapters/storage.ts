import { FileInfo } from "../dto/Storage";
import {IStorage} from "../ports/storage";
import axios from "axios";
import DynamicPixels from "../DynamicPixels";

export class Storage implements IStorage {
    async GetFileInfo(fileName: string): Promise<FileInfo> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/storage/info?fileName=${fileName}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async Download(fileName: string, outputPath: string): Promise<void> {
        axios({
            url: `${DynamicPixels._gameApiEndpoint}/api/storage/download?fileName=${fileName}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const href = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }

}