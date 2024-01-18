import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationPipe1 implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        return value      
    }

}

// function genric1 <P,L>(arrg:P):L{
//     return null;
// }
