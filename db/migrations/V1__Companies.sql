create table companies(
	cnpj char(14) primary key not null,
	name varchar(200) not null,
	fantasy_name varchar(200) not null,
	cnae char(7) not null
);

create or replace function add_company(
	_cnpj companies.cnpj%type,
	_name companies.name%type,
	_fantasy_name companies.fantasy_name%type,
	_cnae companies.cnae%type
) returns companies.cnpj%type as $$
declare 
	cnpj_dec companies.cnpj%type;
begin
	select cnpj into cnpj_dec from companies where cnpj=_cnpj or name=_name;
	
	if found then
		raise exception 'cnpj or company name already exists';
	end if;

	insert into companies (cnpj, name, fantasy_name, cnae)
	values (_cnpj, _name, _fantasy_name, _cnae)
	returning cnpj into cnpj_dec;

	return cnpj_dec;
end
$$ language plpgsql

create or replace function get_companies(
	_entries numeric default 25,
	_page numeric default 0,
	_name companies.name%type default null,
	_order_cnpj boolean default false,
	_order_name boolean default false,
	_order_fantasy_name boolean default false,
	_order_cnae boolean default false
) returns setof companies as $$
	select cnpj, name, fantasy_name, cnae
	from companies
	where 
	case when _name is not null then name like '%' || _name || '%' else true end
	order by
	case when _order_cnpj then lower(cnpj) end asc,
	case when _order_name then lower(name) end asc,
	case when _order_fantasy_name then lower(fantasy_name) end asc,
	case when _order_cnae then lower(cnae) end asc
	limit _entries
	offset _page * _entries
$$ language sql

create or replace function get_companies_page_count(
	_entries numeric default 25
) returns numeric as $$
	select ceil(count(*) / _entries) from companies
$$ language sql

create or replace function edit_company(
	_cnpj companies.cnpj%type,
	_fantasy_name companies.fantasy_name%type default null,
	_cnae companies.cnae%type default null
) returns void as $$
	update companies set 
	fantasy_name = case
		when _fantasy_name is not null
		then _fantasy_name 
		else fantasy_name 
	end,
	cnae = case 
		when _cnae is not null
		then _cnae 
		else cnae 
	end
	where cnpj = _cnpj
$$ language sql

create or replace function delete_company(
	_cnpj companies.cnpj%type
) returns void as $$
	delete from companies
	where cnpj = _cnpj
$$ language sql
