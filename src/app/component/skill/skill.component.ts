import { Component, OnInit } from '@angular/core';
import { FapiRestService } from 'src/app/Service/fapi-rest.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  constructor(private fapi:FapiRestService) { }

  ngOnInit(): void {
    this.listarSkill();
    this.listarTipoSkill();
  }
  mntSkill={
    idSkill:0,
    nombre:'',
    tipoSkill:0,
    imgSkill:'',
    colorImg:'',
    estado:0,
    opcion:0
  }
  objTipoSkill:any;
  objSkill:any;
  listarSkill(){
    this.mntSkill.estado=1;
    this.mntSkill.opcion=5;
    this.fapi.fapiGetParameter('listarSkill',this.mntSkill.opcion+'/'+this.mntSkill.estado).subscribe(x=>{
      this.objSkill=x[0];
      console.log(this.objSkill);
    })
  }
  listarTipoSkill(){
    let opcion=2;
    let idMaestro=3;
    this.fapi.fapiGetParameter('listMaestro',opcion+'/'+idMaestro).subscribe(x=>{
      this.objTipoSkill=x[0];
      console.log(this.objTipoSkill);
    })
  }
}
