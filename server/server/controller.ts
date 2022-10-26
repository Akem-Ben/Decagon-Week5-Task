import fs from "fs";
import path from "path";
import http, { IncomingMessage, Server, ServerResponse } from "http";
import { Organizations } from "./tasks";
import database from './database/database.json';

export const getAllData = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(
      path.join(__dirname, "./database/database.json"),
      "utf8",
      (err, info)=>{
        if(err) {
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ success: false, error: err, }));
        } else {
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ success: true, message: JSON.parse(info)}))
        }
      })
      }

// export const getData = async (req: IncomingMessage, res: ServerResponse) => {
//     let data = "";
//    req.on("data", (chunk) => {
//      data += chunk.toString();
//    });
//    // When the request is done
//    req.on("end", () => {
//      // Parse the data
//      let organization: [Organizations] = JSON.parse(data);
//      // Read the store.json file
//      fs.readFile(path.join(__dirname, "./database/database.json"), "utf8", (err, data) => {
//        // Check out any errors
//        if (err) {
//          // error, send an error message
//          res.writeHead(500, { "Content-Type": "application/json" });
//          res.end(
//            JSON.stringify({
//              success: false,
//              error: err,
//            })
//          );
//        } else {
//          // no error, get the current tasks
//          let organizations: [Organizations] = JSON.parse(data);
//          // find the task with the id
//          let index = organizations.findIndex((eachData) => eachData.id == organizations.id);
         
         
         
//          // remove the task
//          tasks.splice(index, 1);
//          // write the new tasks array to the store.json file
//          fs.writeFile(
//            path.join(__dirname, "store.json"),
//            JSON.stringify(tasks),
//            (err) => {
//              // Check out any errors
//              if (err) {
//                // error, send an error message
//                res.writeHead(500, { "Content-Type": "application/json" });
//                res.end(
//                  JSON.stringify({
//                    success: false,
//                    error: err,
//                  })
//                );
//              } else {
//                // no error, send the data
//                res.writeHead(200, { "Content-Type": "application/json" });
//                res.end(
//                  JSON.stringify({
//                    success: true,
//                    message: task,
//                  })
//                );
//              }
//            }
//          );
//        }
//      });
//    });
// };

    // return fs.readFile(
    //     path.join(__dirname, "./database/database.json"),
    //     "utf8",
    //      async (err, info)=>{
    //       if(err) {
    //         res.writeHead(500, {"Content-Type": "application/json"});
    //         res.end(JSON.stringify({ success: false, error: err, }));

    //        } else {
    //         let organizations: [Organizations] = JSON.parse(info)
    //         console.log(organizations)
    //         //let findInfoById = organizations.find((eachInfo) => eachInfo.id === organizations.id);

         
    //         res.writeHead(200, {"Content-Type": "application/json"});

    //         res.end(JSON.stringify({ success: true, message: JSON.parse(info)}))
    //       }
    //     }) 


export const addData = (req: IncomingMessage, res: ServerResponse) => {
    let info = "";
    req.on("data", (chunk) => {
        info += chunk.toString();
    });
    req.on("end", () => {
        let work = JSON.parse(info);

        fs.readFile(path.join(__dirname, "database.json"), "utf8", (err, info)=>{
            if(err) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(
                    JSON.stringify({
                        success: false,
                        error: err,
                    })
                );
            } else {
               let organization: [Organizations] = JSON.parse(info)
               let newId = organization.reduce((max = 0, work: Organizations)=>(work.id > max ? work.id : max), 0);
               work.id = newId + 1
               organization.push(work)
               fs.writeFile(path.join(__dirname, "./database/database.json"),
               JSON.stringify(organization),
               (err) => {
                if(err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(
                      JSON.stringify({
                        success: false,
                        error: err,
                      })
               )} else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: work,
                  }));
               }
               }
               )
            }
        })
    })
}

export const updateData = (req: IncomingMessage, res: ServerResponse) => {
    // Read the data from the request
    let info = "";
    req.on("data", (chunk) => {
      info += chunk.toString();
    });
    // When the request is done
    req.on("end", () => {
      // Parse the data
      let works: Organizations = JSON.parse(info);
      // Read the store.json file
      fs.readFile(path.join(__dirname, "store.json"), "utf8", (err, info) => {
        // Check out any errors
        if (err) {
          // error, send an error message
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          // no error, get the current tasks
          let newWork: [Organizations] = JSON.parse(info);
          // find the task with the id
          let index = newWork.findIndex((eachInfo) => eachInfo.id === works.id);
          // replace the task with the new one
          newWork[index] = works;
          // write the new tasks array to the store.json file
          fs.writeFile(
            path.join(__dirname, "store.json"),
            JSON.stringify(newWork),
            (err) => {
              // Check out any errors
              if (err) {
                // error, send an error message
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                // no error, send the data
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: works,
                  })
                );
              }
            }
          );
        }
      });
    });
 };

 export const deleteData = (req: IncomingMessage, res: ServerResponse) => {
    // Read the data from the request
    let info = "";
    req.on("data", (chunk) => {
      info += chunk.toString();
    });
    // When the request is done
    req.on("end", () => {
      // Parse the data
      let work: Organizations = JSON.parse(info);
      // Read the store.json file
      fs.readFile(path.join(__dirname, "./database/database.json"), "utf8", (err, info) => {
        // Check out any errors
        if (err) {
          // error, send an error message
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          // no error, get the current tasks
          let newWork: [Organizations] = JSON.parse(info);
          // find the task with the id
          let index = newWork.findIndex((t) => t.id == work.id);
          // remove the task
          newWork.splice(index, 1);
          // write the new tasks array to the store.json file
          fs.writeFile(
            path.join(__dirname, "store.json"),
            JSON.stringify(newWork),
            (err) => {
              // Check out any errors
              if (err) {
                // error, send an error message
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                // no error, send the data
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: work,
                  })
                );
              }
            }
          );
        }
      });
    });
 };
// export {getAllData, addData,}