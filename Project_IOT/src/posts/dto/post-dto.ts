import { ApiProperty } from "@nestjs/swagger"

export class PostDto {

    @ApiProperty({description: "the title of the Post", example: "the first post"})
    title: string

    @ApiProperty({description: "the content of the Post"})
    content: string
}