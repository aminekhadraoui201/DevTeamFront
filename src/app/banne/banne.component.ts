import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { User } from 'app/user';

@Component({
  selector: 'app-banne',
  templateUrl: './banne.component.html',
  styleUrls: ['./banne.component.css']
})
export class BanneComponent implements OnInit {
  userss : User[];
  private allUsers = []; 
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getUsers();
    
      }
      private getUsers(){
    
        this.userService.getUserBanned().subscribe(data => 
          { this. userss = data; 
            this.allUsers = data; // Conserver une copie des données non filtrées
    
          console.log(this.userss);
          
        }
          );
      }
      UnbanneUserArchives(id: number): void {
        this.userService.deleteUserBanne(id).subscribe(response => {
          console.log('Utilisateur supprime banne', response);
          // Rafraîchir la liste des utilisateurs après la suppression
          this.getUsers();
        }, error => {
          console.error('Erreur lors de la suppression de banne', error);
        });
      }

}
