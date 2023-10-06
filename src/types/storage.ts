import supabase from "../supabase";
import { BASE_URL_AVATARS } from "../supabase/urls";

export class Storage {
  static async Delete(
    id: string,
    bucket: string,
    actualUrl: string
  ): Promise<boolean> {
    const strs = actualUrl.split("/");
    const filename = strs[strs.length - 1];
    try {
      await supabase.storage.from(bucket).remove([`${id}/${filename}`]);
    } catch (err) {
      console.log(
        `Error deleting the photo_url on Storage for: ${id}/${filename}. Error: `,
        err
      );
      return false;
    }

    return true;
  }

  static async Update_Supabase(
    entity: string,
    id: string,
    filename: string
  ): Promise<boolean> {
    // Update the photo_url in the entity
    try {
      await supabase
        .from(entity)
        .update({
          photo_url: BASE_URL_AVATARS + `${id}/${filename}.png`,
        })
        .eq("id", id);
    } catch (err) {
      console.log(
        `Error updating the photo_url on Supabase for: ${id}/${filename}.png. Error: `,
        err
      );
      return false;
    }

    return true;
  }

  static async Update(
    id: string,
    entity: string,
    bucket: string,
    file: File,
    filename: string,
    actualUrl?: string
  ): Promise<boolean> {
    try {
      await supabase.storage.from(bucket).update(`${id}/${filename}.png`, file);
      await this.Update_Supabase(entity, id, `${filename}`);
      if (actualUrl !== undefined) await this.Delete(id, bucket, actualUrl);
      return true;
    } catch (err) {
      console.error(
        `Error updating file in bucket (${bucket}). Entity (${entity})`,
        err
      );
      return false;
    }
  }

  static async Upload(
    bucket: string,
    entity: string,
    id: string,
    file: File,
    filename: string,
    actualUrl?: string
  ): Promise<boolean> {
    try {
      const now = Date.now(); // This is important to make sure that the browser will request a again the asset to display into the screen.
      const res = await supabase.storage
        .from(bucket)
        .upload(`${id}/${filename}-${now}.png`, file);
      await this.Update_Supabase(entity, id, `${filename}-${now}`);
      if (res.error)
        return await this.Update(
          id,
          entity,
          bucket,
          file,
          `${filename}-${now}.png`,
          actualUrl
        );
      if (actualUrl !== undefined) await this.Delete(id, bucket, actualUrl);
    } catch (err) {
      console.error(
        `Error uploading file in bucket (${bucket}). Entity (${entity})`,
        err
      );
      return false;
    }

    return true;
  }
}
