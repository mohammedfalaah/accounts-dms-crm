// import { ApiCall } from "../services/ApiCall";
// import { showToast } from "./Toast";

// export default async function FilePicker(files) {
// console.log(files,"filesfilesfilesfilesfilesfilesfiles")
//   return new Promise(async (resolve, reject) => {
//     try {
//       const imageFiles = Array.from(files).filter((file) =>
  
//         file.type.startsWith("image/")
        
//       );

//       if (imageFiles.length === 0) {
//         resolve(null);
//       }

//       const uploadedFiles = imageFiles.map((file) => ({
//         url: URL.createObjectURL(file),
//         filename: file.name,
//         metadata: { name: file.name },
//       }));

//       const formData = new FormData();
//       for (const file of imageFiles) {
//         formData.append("files", file);
//       }

//       let apiResponse = null;
//       try {
//         apiResponse = await ApiCall(
//           "post",
//           "upload",
//           formData,
//           null,
//           "multipart/form-data"
//         );
//         console.log(apiResponse,"apiResponseapiResponse")
//         if (apiResponse?.status) {
//           console.log(apiResponse,'apiResponse')
//           let imagepath;
//           if (uploadedFiles.length > 1) {
//             imagepath = apiResponse?.message?.data;
//           } else {
//             imagepath = apiResponse?.message?.data;
//           }
//           resolve(imagepath);
//         } else {
//           resolve(null);
//           return;
//         }
//       } catch (err) {
//         resolve(null);
//       }

//       // if (apiResponse?.status) {
//       //   let imagepath;
//       //   if (uploadedFiles.length > 1) {
//       //     imagepath = apiResponse?.message?.data;
//       //   } else {
//       //     imagepath = apiResponse?.message?.data;
//       //   }
//       //   resolve(imagepath);
//       // } else {
//       //   console.log("TOO LARGE ERROR");
//       //   showToast("The File size is too large", false);
//       //   resolve(null);
//       // }
//     } catch (error) {
//       reject(error);
//       resolve(null);
//     }
//   });
// }

import { ApiCall } from "../services/ApiCall";
import { ShowMessage } from "./Messages";
import { showToast } from "./Toast";

export default async function FilePicker(files,value) {
  console.log(value, "filesfilesfilesfilesfilesfilesfiles");

  return new Promise(async (resolve, reject) => {
    try {
      // Filter files to include images and PDFs
      const validFiles = Array.from(files).filter((file) =>
        ["image/", "application/pdf"].some((type) =>
          file.type.startsWith(type)
        )
      );

      if (validFiles.length === 0) {
        resolve(null);
        return;
      }

      const uploadedFiles = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        filename: file.name,
        metadata: { name: file.name },
      }));

      const formData = new FormData();
      for (const file of validFiles) {
        formData.append("files", file);
        formData.append("previousFiles", value);
      }

      try {
        const apiResponse = await ApiCall(
          "post",
          "upload",
          formData,
          null,
          "multipart/form-data"
        );
        console.log("--------------------------------------------")
        console.log(apiResponse, "apiResponseapiResponse");
        console.log("--------------------------------------------")

        
        if (apiResponse?.status) {
          let filepaths;
          if (uploadedFiles.length > 1) {
            filepaths = apiResponse?.message?.data;
          } else {
            filepaths = apiResponse?.message?.data;
          }
          resolve(filepaths);
        } else {
          resolve(null);
        }
      } catch (err) {
        showToast("Payload Too Large",false)
        console.error('API call error:', err);
        resolve(null);
      }
    } catch (error) {
 
      console.error('FilePicker error:', error);
      reject(error);
      resolve(null);
    }
  });
}
