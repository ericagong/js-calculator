export class AbstractClassError extends TypeError {
    constructor(className) {
        super(`${className}는 직접 인스턴스화할 수 없습니다.`);
        this.name = this.constructor.name;
    }
}
