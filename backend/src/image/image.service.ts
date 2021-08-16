import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Image, ImageDocument} from "./image.schema";

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}


    async findAll(): Promise<Image[]> {
        return this.imageModel.find().exec();
    }

    async findOneById(id: string): Promise<Image> {
        return this.imageModel.findById(id).exec();
    }

    async findOneByName(name: string): Promise<Image> {
        return this.imageModel.findOne({originalname: name}).exec();
    }

    async create(
        image: Image): Promise<Image> {
        const createdImage = new this.imageModel(image);
        return createdImage.save();
    }

    async remove(name: string): Promise<void> {
       await this.imageModel.findOneAndDelete({originalname: name});
    }
}
