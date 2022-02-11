﻿namespace PeliculasAPI.Application.Dtos.Request
{
    public class PagingDTO
    {

        public int Page { get; set; } = 1;
        private int recordsPerPage = 10;
        private readonly int MaxRecordsPerPage = 50;

        public int RecordsPerPage
        {
            get { return recordsPerPage; }
            set {
                recordsPerPage = value > MaxRecordsPerPage ?
                    MaxRecordsPerPage : value; }
        }
    }
}
