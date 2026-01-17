import clockinService from '../services/clockin.service'
import  Clockin  from '../models/clockin.model'

import { Request, Response, NextFunction } from "express";
import mongoose,{Types} from "mongoose";
import ICheckin from '../interface/clockin.interface';

class clockinController {   
    extraWork = async (req: Request, res: Response, next:NextFunction) => {            
        let inTime = new Date();
        inTime.setUTCHours(0, 0, 0, 0);

        let outTime = new Date("2026-01-16T18:11:22");
        outTime.setUTCHours(0, 0, 0, 0);

        //return res.json({"inTime1":inTime,"outTime": outTime})
        res.json({"inTime":inTime.getTime(),"outTime": outTime.getTime()})
        //It returns a number:milliseconds since 1 Jan 1970 (UTC)
    }
    bulkClockin =async (req: Request, res: Response, next:NextFunction) =>{
         try {
            const data = await clockinService.bulkClockin(req.body);
            return res.status(201).json({success:true,message:"successfully added", data: data});
        }
        catch(e){
            next(e)
        }              
    }

    doClockin = async (req: Request, res: Response, next:NextFunction) => {            
        try {
            const data = await clockinService.doClockin(req.body);
            return res.status(201).json({success:true,message:"successfully added", data: data});
        } catch (err) {
            next(err);
        }                    
    }
    empWiseClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {
            const start_date= req.body?.start_date ?? "2026-01-01"
            const end_date= req.body?.end_date ?? "2026-01-17"
            const data = await clockinService.empWiseClockin(start_date, end_date);
            return res.status(201).json({success:true,message:"successfully listed", data: data});
        } catch (err) {
            next(err);
        }
    }
    missingClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {
            const start_date= req.body?.start_date ?? "2026-01-01"
            const end_date= req.body?.end_date ?? "2026-01-17"
            const data = await clockinService.empWiseClockin(start_date, end_date);
            return res.status(201).json({success:true,message:"successfully listed", data: data});
        } catch (err) {
            next(err);
        }
    }
    filterClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {            
            const data = await clockinService.filterClockin();
            return res.status(201).json({success:true,message:"successfully filterClockin", data: data});
        } catch (err) {
            next(err);
        }
    }
    reducerClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {            
            const data = await clockinService.reducerClockin();
            return res.status(201).json({success:true,message:"successfully reducerClockin", data: data});
        } catch (err) {
            next(err);
        }
    }
    mapClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {            
            const data = await clockinService.mapClockin();
            return res.status(201).json({success:true,message:"successfully mapClockin", data: data});
        } catch (err) {
            next(err);
        }
    }
    foreachClockin = async (req: Request, res: Response, next:NextFunction) => {
        try {           
            const data = await clockinService.foreachClockin();
            return res.status(201).json({success:true,message:"successfully foreachClockin", data: data});
        } catch (err) {
            next(err);
        }
    }
}

//export class
export const ClockinController = new clockinController()