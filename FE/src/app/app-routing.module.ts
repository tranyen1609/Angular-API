import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

//import các module cần điều hướng
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //khai báo route mặc định, tức là khi ko chỉ định path cụ thể thì sẽ mở màn hình này đầu tiên
  {path: '', redirectTo : '/login', pathMatch:'full'},
  //Khai báo các route
  {path: 'home', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'main', component : UsersComponent},
  {path: 'contact', component : ContactComponent},
  //Truyền vào id để xem chi tiết
  {path: 'detail/:id', component : UserDetailComponent},
  //Khi nhập sai link sẽ tự chuyển vào component này (Dòng này phải được đặt cuối cùng của route)
  {path: '**', component : PagenotfoundComponent}
  
];

@NgModule({
  imports: [
    //CommonModule,
    RouterModule.forRoot(routes)  //Khởi chạy đầu tiên khi app chúng ta chạy
  ],
  //Không dùng đến declarations
  //declarations: []
  exports: [RouterModule]
})
export class AppRoutingModule { }
