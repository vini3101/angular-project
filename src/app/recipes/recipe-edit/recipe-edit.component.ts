import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}

  handleEdit(params: Params) {
    this.id = +params['id'];
    this.editMode = params['id'] != null;
  }

  ngOnInit() {
    this.route.params.subscribe(this.handleEdit.bind(this));
  }
}
