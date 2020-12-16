import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FapiRestService} from '../../Service/fapi-rest.service';

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css']
})
export class GestionMenuComponent implements OnInit {

  constructor(private modalService: BsModalService,private fapi:FapiRestService) {}

  ngOnInit(): void {
  }
  
}
