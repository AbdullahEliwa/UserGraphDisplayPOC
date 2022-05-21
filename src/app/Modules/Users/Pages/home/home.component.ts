import { Component, OnInit } from '@angular/core';
import { userNode } from 'src/app/Modules/Shared/Components/graph/Models/node';
import { UserService } from 'src/app/Modules/Shared/Services/user.service';
import { user } from '../../Models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users!: user[];
  userNodes!: userNode[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers$();
  }

  loadUsers$() {
    this.userService.users$().subscribe({
      next: (res) => {
        this.users = res
          .map((u) => {
            u.codeArray = u.code.split('.').map(Number);
            return u;
          })
          .sort((x, y) => (x.codeArray.length < y.codeArray.length ? -1 : 0));
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log(this.users);
        this.userNodes = this.convertUserArrayToNodes(this.users);
        console.log(this.userNodes);
      },
    });
  }

  private convertUserArrayToNodes(users: user[]): userNode[] {
    let userNodes: userNode[] = [];
    users.forEach((user) => {
      if (user.codeArray.length == 1) {
        userNodes?.push({ user: user, userChildren: [] });
      }
      if (user.codeArray.length == 2) {
        userNodes
          .find((u) => u.user.codeArray[0] == user.codeArray[0])
          ?.userChildren?.push({ user: user, userChildren: [] });
      } else if (user.codeArray.length == 3) {
        userNodes
          .find((u) => u.user.codeArray[0] == user.codeArray[0])
          ?.userChildren.find((u) => u.user.codeArray[1] == user.codeArray[1])
          ?.userChildren?.push({
            user: user,
            userChildren: [],
          });
      } else if (user.codeArray.length == 4) {
        userNodes
          .find((u) => u.user.codeArray[0] == user.codeArray[0])
          ?.userChildren.find((u) => u.user.codeArray[1] == user.codeArray[1])
          ?.userChildren.find((u) => u.user.codeArray[2] == user.codeArray[2])
          ?.userChildren?.push({ user: user, userChildren: [] });
      }
    });

    return userNodes;
  }
}
