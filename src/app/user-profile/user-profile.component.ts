import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserService } from 'app/service/user.service';
import { Role,Niveau ,Specialite} from 'app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ,private authService: AuthService,private userService: UserService) { }
  user: any;
  roles = Object.values(Role);
  ngOnInit() {
    this.initForm();
    this.loadUserData();
  }

  // Initialisation du formulaire avec les validations
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