import { FileInfo } from "../dto/Storage";

export interface IStorage{
    GetFileInfo(fileName: string): Promise<FileInfo>
    Download(fileName: string, outputPath: string): Promise<void>
}