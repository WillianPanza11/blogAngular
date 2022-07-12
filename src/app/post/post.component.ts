import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostControllerService, PostDto } from '../ServiceSwagger';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //post?: PostDto;
  post: PostDto ={
    content: "",
    id: 0,
    title: "",
    username: ""
  }

  permaLink!: number;
  mostrarCompleto = false;

  constructor(private router: ActivatedRoute, private postService: PostControllerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.findPostByIdUsingGET(this.permaLink).subscribe((data) => {
      if(data){
        this.post = data.object!;
      }else{
        this.post = {}
        this.toastr.error('SUCEDIÓ UN ERROR', 'VUELVA A INTENTAR');
      }
    }, (err: any) => {
      this.toastr.error('SUCEDIÓ UN ERROR', 'VUELVA A INTENTAR');
    })
  }
}
