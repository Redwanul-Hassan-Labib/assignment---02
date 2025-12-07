import { Request, Response } from "express";

import { userService } from "./uers.service";

const postUserController = async (req: Request, res: Response) => {
//   const { name, email, password, phone, role } = req.body;

  try {
    const result = await userService.postUserService(req.body);
    res.status(201).json({
      success: false,
      message: "users Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


const getUserController = async(req:Request, res:Response)=>{
    try {
        const result = await userService.getUserService()
        res.status(201).json({
            success: true,
            message: "Users retrieved Successfully ",
            data: result.rows,
        });    
    } catch (err:any) {
        res.status(500).json({
            success: false, 
            message: err.message,
            details: err,
        })
    }
}

const putUserController = async (req: Request, res: Response) => {
 
  try {
    const result = await userService.putUserService( {
      ...req.body,
      id: req.params.id,
    }
     
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "users not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "users updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUserService(req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const userController = {
    postUserController,
    getUserController,
    deleteUserController,
    putUserController

}