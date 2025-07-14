import { ApiProperty } from "@nestjs/swagger"

export class PostDto {

    @ApiProperty({description: "the title of the Post", example: "the first post"})
    title: string

    @ApiProperty({description: "the id of the Post's User"})
    UserId: number

    @ApiProperty({description: "the content of the Post"})
    content: string
}