package pw.react.backend.web;

import pw.react.backend.models.Company;

public record CompanyDto(long id, String name,
                        long startDateTime,
                         int boardMembers) {
    public static final CompanyDto EMPTY = new CompanyDto(-1, "", 0, -1);

    public static CompanyDto valueFrom(Company company) {
        return new CompanyDto(company.getId(), company.getName(), company.getStartDateTime(), company.getBoardMembers());
    }

    public static Company convertToCompany(CompanyDto dto) {
        Company company = new Company();
        company.setId(dto.id());
        company.setName(dto.name());
        company.setStartDateTime(dto.startDateTime());
        company.setBoardMembers(dto.boardMembers());
        return company;
    }

}
