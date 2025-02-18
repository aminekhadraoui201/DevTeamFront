import { Component, OnInit , ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Role,Niveau ,Specialite} from 'app/user';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'app/service/auth.service';
import { UserService } from 'app/service/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/ghofrane', title: 'Ghofrane',  icon: 'dashboard', class: '' }
];
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  menuItems: any[];
  user: any;
  userProfileForm: FormGroup;

  constructor(private authService: AuthService,private fb: FormBuilder, private router: Router ,private userService: UserService) { }
 
  roles = Object.values(Role);
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.user = this.authService.getUserDetails();
    this.initForm();
    this.loadUserData();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

 
  getTitle(): string {
    // Implement logic to get the title dynamically
    return 'Title';
  }

  sidebarToggle(): void {
    // Implement logic to toggle the sidebar visibility
    console.log('Sidebar toggled');
    // You can add your logic here to toggle the sidebar visibility
  }

  private initForm() {
    this.userProfileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Supprimez le champ password s'il ne doit pas être modifié ici
      role: [''],
      // Ajoutez d'autres champs nécessaires
    });
  }

  // Chargement des données de l'utilisateur
  private loadUserData() {
    const userData = this.authService.getUserDetails();
    if (userData) {
      this.userProfileForm.patchValue({
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        role: userData.role,
        // Assurez-vous d'ajuster pour d'autres champs comme l'image
      });
    }
  }

  // Méthode de mise à jour (doit être implémentée ou adaptée à votre AuthService)
  updateUserProfile() {
    if (this.userProfileForm.valid) {
      console.log("Formulaire valide. Données du formulaire :", this.userProfileForm.value);
      // Suppose que `userId` est disponible. Il faut le récupérer selon votre logique d'application.
      const userId = this.getUserID(); // Remplacez cette ligne par votre logique pour obtenir l'ID de l'utilisateur
  
      this.userService.updateUser(userId, this.userProfileForm.value).subscribe({
        next: (res) => {
          console.log("Réponse du service :", res); 
          this.router.navigate(['/admin/user']);
        },
        error: (e) => console.error("Erreur lors de la mise à jour de l'utilisateur", e),
        complete: () => console.log("Mise à jour de l'utilisateur complétée")
      });
    } else {
      console.log("Veuillez remplir tous les champs du formulaire.");
    }
  }
  
  private getUserID(): number {
    // Implémentez votre logique ici pour obtenir l'ID de l'utilisateur à mettre à jour
    // Cette méthode est juste un placeholder pour votre logique réelle
    return 26;
  }

}





  
 
