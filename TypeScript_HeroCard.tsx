// Enum для типів героїв

enum HeroType {

    Warrior = "WARRIOR",

    Mage = "MAGE",

    Archer = "ARCHER"

}


// Enum для типів атак

enum AttackType {

    Physical = "PHYSICAL",

    Magical = "MAGICAL",

    Ranged = "RANGED"

}


// Interface для характеристик героя

interface HeroStats {

    health: number;

    attack: number;

    defense: number;

    speed: number;

}


// Interface для героя

interface Hero {

    id: number;

    name: string;

    type: HeroType;

    attackType: AttackType;

    stats: HeroStats;

    isAlive: boolean;

}


// Type для результату атаки

type AttackResult = {

    damage: number;

    isCritical: boolean;

    remainingHealth: number;

}


// Функція створення нового героя

function createHero(name: string, type: HeroType): Hero {

    const baseStats: HeroStats = {

        health: 100,

        attack: 10,

        defense: 5,

        speed: 5

    };


    switch (type) {

        case HeroType.Warrior:

            baseStats.attack += 5;

            baseStats.defense += 5;

            break;

        case HeroType.Mage:

            baseStats.attack += 10;

            baseStats.speed += 5;

            break;

        case HeroType.Archer:

            baseStats.attack += 7;

            baseStats.speed += 8;

            break;

    }


    return {

        id: Math.floor(Math.random() * 1000),

        name,

        type,

        attackType: type === HeroType.Mage ? AttackType.Magical : AttackType.Physical,

        stats: baseStats,

        isAlive: true

    };

}


// Функція розрахунку пошкодження

function calculateDamage(attacker: Hero, defender: Hero): AttackResult {

    const baseDamage = attacker.stats.attack - defender.stats.defense;

    const damage = baseDamage > 0 ? baseDamage : 0;

    const isCritical = Math.random() < 0.2; // 20% шанс критичного удару

    const finalDamage = isCritical ? damage * 2 : damage;

    const remainingHealth = defender.stats.health - finalDamage;


    return {

        damage: finalDamage,

        isCritical,

        remainingHealth: Math.max(remainingHealth, 0)

    };

}


// Generic функція для пошуку героя в масиві

function findHeroByProperty<T extends keyof Hero>(

    heroes: Hero[],

    property: T,

    value: Hero[T]

): Hero | undefined {

    return heroes.find(hero => hero[property] === value);

}


// Функція проведення раунду бою між героями

function battleRound(hero1: Hero, hero2: Hero): string {

    if (!hero1.isAlive || !hero2.isAlive) {

        return "Один з героїв не може битися.";

    }


    const attackResult = calculateDamage(hero1, hero2);

    hero2.stats.health = attackResult.remainingHealth;


    if (hero2.stats.health <= 0) {

        hero2.isAlive = false;

        return `${hero1.name} атакує ${hero2.name} і завдає ${attackResult.damage} пошкоджень! ${hero2.name} переможений!`;

    }


    return `${hero1.name} атакує ${hero2.name} і завдає ${attackResult.damage} пошкоджень! ${hero2.name} залишився з ${hero2.stats.health} здоров'я.`;

}


// Створити масив героїв

const heroes: Hero[] = [

    createHero("Дмитро", HeroType.Warrior),

    createHero("Мерлін", HeroType.Mage),

    createHero("Леон", HeroType.Archer)

];


// Приклад використання

const warrior = createHero("Дмитро", HeroType.Warrior);

const mage = createHero("Мерлін", HeroType.Mage);


// Проводимо бій 

const battleResult = battleRound(warrior, mage);

console.log(battleResult); 


// Шукаємо героя за властивістю 

const hero = findHeroByProperty(heroes, "type", HeroType.Warrior);

console.log(hero);