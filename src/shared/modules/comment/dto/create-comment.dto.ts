import {
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from "class-validator";

export class CreateCommentDto {
  @ValidateIf((o) => !o.comment)
  @IsString({ message: "text is required" })
  @Length(5, 1024, {
    message: "text length must be between 5 and 1024 characters",
  })
  public text?: string;

  @ValidateIf((o) => !o.text)
  @IsString({ message: "comment is required" })
  @Length(5, 1024, {
    message: "comment length must be between 5 and 1024 characters",
  })
  public comment?: string;

  @IsNumber({}, { message: "rating must be a number" })
  @Min(1, { message: "rating must be at least 1" })
  @Max(5, { message: "rating must be at most 5" })
  public rating!: number;

  // offerId приходит из параметров маршрута и валидируется через ValidateObjectIdMiddleware
  public offerId!: string;
}
