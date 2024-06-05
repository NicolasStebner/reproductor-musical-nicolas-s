import { copyrightType } from "../types/domain";

export class Copyright{
  constructor(
    public text: string,
    public type: string,
  ){}
  
  static initialize(copyrightType: copyrightType){
    return Object.assign(
      new Copyright(
        copyrightType.text,
        copyrightType.type,
      )
    )
  }
}