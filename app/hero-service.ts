
import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero'; 
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService{
	
	private heroesUrl = 'app/heroes';
	
	constructor(private http: Http){ }
	
	getHero(id: number){
		return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
	}

	private handleError(error: any){
		console.error('An error occurred', error);	
		return Promise.reject(error.message || error);
	}
	
	//POST
	// Add new Hero
	private post(hero: Hero): Promise<Hero>{
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		
		return this.http
				.post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
				.toPromise()
				.then(res => res.json().data)
				.catch(this.handleError);
	}
	
	//PUT
	// update existing hero
	private put(hero: Hero){
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		let url = `${this.heroesUrl}/${hero.id}`;
		
		return this.http
				.put(url, JSON.stringify(hero), {headers: headers})
				.toPromise()
				.then(() => hero)
				.catch(this.handleError);
	}
	
	//DELETE
	// delete existing hero
	delete(hero: Hero){
		
		console.log("hero: " + hero);
		console.log("hero.id: " + hero.id);
		
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.heroesUrl}/${hero.id}`;
		return this.http
				.delete(url, {headers: headers})
				.toPromise()				
				.catch(this.handleError);
	}
	
	save(hero: Hero): Promise<Hero>{
		if (hero.id){
			return this.put(hero);
		}
		return this.post(hero);
	}
	
	getHeroes(){
		//return Promise.resolve(HEROES);
		return this.http.get(this.heroesUrl)
					.toPromise()
					.then(response => response.json().data as Hero[])
					.catch(this.handleError);
	}
	
	
	getHeroesSlowly(){
		return new Promise<Hero[]>(resolve =>
				setTimeout(() => resolve(HEROES), 2000) // 2 seconds
		);
	}
}