export class Tag {
  constructor(public text: string, public tagId?: number) {
      if (tagId) {
          this.tagId = tagId;
          this.text = text;
      } else {
          this.text = text;
      }
  }
}
