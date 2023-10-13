export class BranchImage {
  id: string;
  created_at: Date;
  branch_id: string;
  photo_url: string;

  constructor(branchImage: BranchImage) {
    this.id = branchImage.id;
    this.created_at = branchImage.created_at;
    this.branch_id = branchImage.branch_id;
    this.photo_url = branchImage.photo_url;
  }

  static ConvertBranchImageToStringArray(
    branchImages: BranchImage[]
  ): string[] {
    let imgsUrls: string[] = [];
    for (const b of branchImages) {
      imgsUrls.push(b.photo_url);
    }
    return imgsUrls;
  }
}
