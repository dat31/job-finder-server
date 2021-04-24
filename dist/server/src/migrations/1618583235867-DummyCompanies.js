"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyCompanies1618583235867 = void 0;
class DummyCompanies1618583235867 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
       insert into company (id, name, location) values (1, 'Skilith', '6 Oneill Terrace');
insert into company (id, name, location) values (2, 'Shuffletag', '39686 Pond Alley');
insert into company (id, name, location) values (3, 'Trilith', '3745 Dexter Street');
insert into company (id, name, location) values (4, 'Wikido', '499 Banding Street');
insert into company (id, name, location) values (5, 'Kwilith', '6 Anderson Terrace');
insert into company (id, name, location) values (6, 'Yabox', '891 North Parkway');
insert into company (id, name, location) values (7, 'Tavu', '904 Forest Run Pass');
insert into company (id, name, location) values (8, 'Devshare', '2981 Ridgeview Road');
insert into company (id, name, location) values (9, 'Jetpulse', '541 Forest Dale Center');
insert into company (id, name, location) values (10, 'Chatterpoint', '411 Service Parkway');
insert into company (id, name, location) values (11, 'Skinix', '6 Lawn Trail');
insert into company (id, name, location) values (12, 'Leexo', '66 Fremont Terrace');
insert into company (id, name, location) values (13, 'Janyx', '73767 Blue Bill Park Drive');
insert into company (id, name, location) values (14, 'Demivee', '9310 Karstens Hill');
insert into company (id, name, location) values (15, 'Meeveo', '83919 Northport Avenue');
insert into company (id, name, location) values (16, 'Meevee', '5578 Mcbride Crossing');
insert into company (id, name, location) values (17, 'Tagfeed', '06 Talisman Center');
insert into company (id, name, location) values (18, 'Blogtags', '8 Ridgeway Court');
insert into company (id, name, location) values (19, 'Jaxbean', '25 Shelley Crossing');
insert into company (id, name, location) values (20, 'Browseblab', '909 La Follette Court');
insert into company (id, name, location) values (21, 'Plambee', '0065 Atwood Way');
insert into company (id, name, location) values (22, 'Dabtype', '43 Talmadge Crossing');
insert into company (id, name, location) values (23, 'Trilia', '04017 Muir Point');
insert into company (id, name, location) values (24, 'Voomm', '520 Lake View Avenue');
insert into company (id, name, location) values (25, 'Quatz', '416 Shopko Alley');
insert into company (id, name, location) values (26, 'Jatri', '18 Nancy Park');
insert into company (id, name, location) values (27, 'Teklist', '4 Sutherland Pass');
insert into company (id, name, location) values (28, 'Browseblab', '91 American Ash Trail');
insert into company (id, name, location) values (29, 'Yamia', '47 Lyons Lane');
insert into company (id, name, location) values (30, 'Youopia', '5 Rigney Pass');
insert into company (id, name, location) values (31, 'Ozu', '35 Ridge Oak Alley');
insert into company (id, name, location) values (32, 'Topicstorm', '7604 Jenifer Way');
insert into company (id, name, location) values (33, 'Thoughtsphere', '601 Briar Crest Circle');
insert into company (id, name, location) values (34, 'Dablist', '5204 Service Trail');
insert into company (id, name, location) values (35, 'Geba', '04084 Buena Vista Road');
insert into company (id, name, location) values (36, 'Fivechat', '8050 Fairview Drive');
insert into company (id, name, location) values (37, 'Oozz', '035 Amoth Alley');
insert into company (id, name, location) values (38, 'Riffpedia', '027 Rowland Trail');
insert into company (id, name, location) values (39, 'Demizz', '24 Schurz Way');
insert into company (id, name, location) values (40, 'Tavu', '33498 Paget Alley');
insert into company (id, name, location) values (41, 'Dynabox', '9 Porter Point');
insert into company (id, name, location) values (42, 'Skipfire', '68288 Norway Maple Street');
insert into company (id, name, location) values (43, 'Muxo', '9342 Hermina Trail');
insert into company (id, name, location) values (44, 'Flashset', '5 Gerald Road');
insert into company (id, name, location) values (45, 'Eare', '82829 Florence Point');
insert into company (id, name, location) values (46, 'Brainsphere', '12 Merrick Trail');
insert into company (id, name, location) values (47, 'Eazzy', '11726 Melrose Court');
insert into company (id, name, location) values (48, 'Brainlounge', '15587 Green Hill');
insert into company (id, name, location) values (49, 'Bluezoom', '69318 Redwing Alley');
insert into company (id, name, location) values (50, 'Bubbletube', '1713 Stone Corner Point');


        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.DummyCompanies1618583235867 = DummyCompanies1618583235867;
//# sourceMappingURL=1618583235867-DummyCompanies.js.map