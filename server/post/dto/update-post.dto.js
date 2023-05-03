export class UpdatePostDto {
    constructor(body) {
        this.content = body.content;
    }

    static fromRequest(body) {
        const updatePostDto = new UpdatePostDto(body);

        for (const key in body)
            if (!updatePostDto[key]) throw new Error(`Invalid field: ${key}`);

        return updatePostDto;
    }
}
