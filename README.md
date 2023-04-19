# Exercice technique Ringover : Todolist

## 1. [Exercices](#exercices)

## 2. [Todolist](#todolist)

---

## 1. Exercices

1. Les variables existent en Javascript mais n’existent ni en HTML ni en CSS. Vrai ou Faux ?

```
Faux. Les variables existent en CSS. Elles sont appelées CSS variables ou CSS Custom properties.
```

2. Quelle est la différence entre ces différentes méthodes de stockage :

a. Cookie

```
Le cookie stocke une information sous forme d'une chaîne de charactère pour une durée limitée définie à la création du cookie. On peut s'en servir pour garder l'information d'une authentification par exemple.
```

b. SessionStorage

```
Ce qui est stocké dans le SessionStorage restent le temps d'une session sur un site. Lorsque tous les onglets d'un site sont fermés, le SessionStorage est vidé.
```

c. LocalStorage

```
Le stockage dans le LocalStorage est permanent jusqu'à action manuel de l'utilisateur ou du site visité.
```

3. Quelles sont les règles CSS qui doivent être ajoutées pour appliquer un ellipsis sur un
   texte (réduire dynamiquement la longueur d’un texte afin qu’il ne dépasse pas son
   container et sans qu’il n’aille à la ligne) ?

```
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

4. Vous êtes face à une liste de 1000 éléments (`<li></li>`) pour lesquels chacun de ces
   éléments déclenche au clic une alerte avec le texte du contenu. Comment et pourquoi
   optimisez-vous l’écoute d'événement dans ce cas ?

```
Les events listener utilise de la mémoire, en utiliser autant ralentirait la page avec une fuite de mémoire.
Au lieu d'écouter le clic sur chaque <li>, on déléguerait son écoute à son parent, un <ul> ou un <ol>, qui capterait tous les clics de ses enfants. Lorsque le clic arrive au listener du parent, on regarder si l'event appartient bien un <li> enfant et ensuite on exécuterait l'alerte.
```

5. Quelles sont les différences entre les types de variable suivants : var, let et const ?

```
var : On peut réaffecter une autre valeur après son initialisation. Le scope de ce type de variable est global.
let : On peut réaffecter une autre valeur après son initialisation. Le scope de ce type de variable est la closure la plus proche.
const : C'est une variable constante, on ne peut pas réaffecter une autre valeur après son initialisation. Le scope de ce type de variable est la closure la plus proche.
```

6. Quels sont les différents avantages à l’utilisation des outils de développement
   “Performances” et “Mémoire” dans les navigateurs Firefox et Chromium ?

```
L'outil "Performance" permet d'analyser les performances en temps réel d'une page web et non à son chargement. On peut aussi simuler différentes puissances de CPU, notemment pour s'assurer que notre application tourne bien sur les appareils mobiles bas de gamme.

Un trop gros nombre d'élément HTML peut être néfaste pour l'affichage et la navigation d'une page web, ou encore l'utilisation de certains sélecteurs CSS peut ralentir une page web ou enfin l'utilisation de listener en javascript peut utiliser beaucoup de ressource de l'appareil. L'outils "Memoire" nous aide ici à dicerner et analyser quels composants d'une page web utilisent beaucoup de mémoire ou s'il y a une fuite de mémoire.
```

7. Quelle a été votre tâche la plus ardue face à laquelle vous vous êtes confronté au cours
   de votre expérience professionnelle ?

```
L'optimisation d'un formulaire d'une vingtaines de question React avec plusieurs parcours selon les réponses données. Notamment la saisie de chaîne de charactère dans le formulaire était extrêmement lente. Au final j'ai pu tâcler le problème avec de la mémoisation.
```

8. Quelle est la dernière chose que vous avez apprise récemment ?

```
J'ai appris à utiliser Nx, un builder javascript optimisé pour l'utilisation de monorepo. J'ai pu tester avec un site personnel Next.js, un projet personnel et une librairie de components utilisée par les deux sites, le tout buildé dans le même repo géré par Nx. Ce qui est très intéressant, c'est que c'est très rapide et que les tests e2e et storybook sont prévus pour chacun des projets.
```

9. Cette année, quelle techno aimeriez-vous apprendre et utiliser ?

```
Cette année j'aimerais apprendre et utiliser Typescript.
```

## 2. Todolist

### Prérequis

Lancer l'API avec l'exécutable `todolist_windows_amd64.exe` ou via la ligne de
commande `./todolist_system_amd64`.

### Comment lancer le projet

1. Ouvrir le fichier index.html situé dans le dossier `todo-list/dist`

ou

1. Dans le dossier todo-list, lancer `yarn install` ou `npm install`
2. Puis lancer `yarn dev`
3. Aller sur [http://localhost:5173/](http://localhost:5173/)
